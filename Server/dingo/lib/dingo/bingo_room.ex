defmodule Dingo.BingoRoom do
  @moduledoc """
  Game room module for Bingo game
  """

  use Garuda.GameRoom
  alias Dingo.CoreUtils
  # Client functions
  def on_player_join(pid, player_id) do
    GenServer.call(pid, {"player_join", player_id})
  end

  def on_player_move(pid, player_id, cell) do
    GenServer.call(pid, {"player_move", cell, player_id})
  end

  def on_player_leave(pid, player_id) do
    GenServer.call(pid, {"player_leave", player_id})
  end

  # server functions
  @impl true
  def create(opts) do
    IO.puts("Created Bingo room #{inspect opts}")
    setup_room_state(opts)
  end

  @impl true
  def handle_call({"player_join", player_id}, _from, state) do
    {board, board_index} = CoreUtils.generate_random_bingo_board()
    state = put_in state["players"][player_id], %{"board" => board, "index" => board_index, "bingo_count" => 0}
    state = put_in state["turn_list"], state["turn_list"] ++ [player_id]
    IO.puts("on_join update #{inspect player_id}")
    can_start_match = Enum.count(state["players"]) === state["max_players"]
    {:reply, {can_start_match, List.first(state["turn_list"]), %{"board" => board, "index" => board_index}}, state}
  end

  @impl true
  def handle_call({"player_move", [row, col] = cell, player_id}, _from, state) do
    IO.puts("On player move #{player_id} => #{inspect cell}")
    case player_id === Enum.fetch!(state["turn_list"], state["current_turn"]) do
      true ->
        %{"check" => false, "num" => selected_number} = state["players"][player_id]["board"][row][col]
        IO.puts("valid turn => #{inspect selected_number}")
        state = update_players_board(state, selected_number)
        |> broadcast_lineclear_counts(selected_number)
        # IO.puts(inspect state)
        if state["gameover"] do
          IO.puts("Games freaking over")
          shutdown(state)
        end
        {:reply, "ok", state}
      _ ->
        IO.puts("player invalid")
        {:reply, "invalid", state}
    end
  end

  @impl true
  def handle_call({"player_leave", player_id}, _from, state) do
    IO.puts("Player leaving #{player_id}")
    {:reply, "left", state}
  end

  # Helper functions
  defp setup_room_state([room_id: roomid, player_id: _playerid, max_players: max_players] = _opts) do
    %{
      "room_id" => roomid,
      "players" => %{},
      "turn_list" => [],
      "max_players" => max_players,
      "current_turn" => 0,
      "gameover" => false
    }
  end

  defp is_checked_already?([row, col] = _cell, player_data) do
    player_data["board"][row][col]["check"]
  end

  defp update_player_board(false, cell, player_data) do
    [row, col] = cell
    player_data = put_in player_data["board"][row][col]["check"], true
    {"valid", player_data}
  end

  defp update_player_board(_, _cell, player_data) do
    {"invalid", player_data}
  end

  defp check_lineclear({"valid", player_data}, cell) do
    # CoreUtils.print_board(player_data["board"])
    clear_count = CoreUtils.count_cleared_lines(player_data["board"], cell)
    bingo_count = clear_count + player_data["bingo_count"]
    player_data = %{
      player_data | "bingo_count" => bingo_count
    }
    {"valid", player_data}
  end

  defp check_lineclear(data, _cell), do: data

  defp update_players_board(state, number) do
    player_ids = Map.keys(state["players"])
    IO.puts("Player ids => #{inspect player_ids}")
    state = Enum.reduce(player_ids, state, fn player_id, state ->
      player_data = state["players"][player_id]
      cell = player_data["index"][number]
      {_board_status, player_data} = is_checked_already?(cell, player_data)
      |> update_player_board(cell, player_data)
      |> check_lineclear(cell)
      put_in state["players"][player_id], player_data
    end)
    %{
      state | "current_turn" => rem(state["current_turn"] + 1, 2)
    }
  end

  defp broadcast_lineclear_counts(state, selected_number) do
    lineclear_count_list = state["players"]
    |> Map.to_list()
    |> Enum.map(fn {player_id, player_state} ->
      [player_id, player_state["bingo_count"]]
    end)
    IO.puts(inspect lineclear_count_list)
    DingoWeb.Endpoint.broadcast!(get_channel(), "line_counts", %{"counts" => lineclear_count_list,
    "next_turn" => Enum.fetch!(state["turn_list"], state["current_turn"]), "num" => selected_number})
    winner_list = Enum.filter(lineclear_count_list, fn [_pid, count] ->
      count >= 5
    end)

    case winner_list do
      [] -> state
      winner_list ->
        DingoWeb.Endpoint.broadcast!(get_channel(), "gameover", %{"winner" => winner_list})
        %{
          state | "gameover" => true
        }
    end
  end

end
