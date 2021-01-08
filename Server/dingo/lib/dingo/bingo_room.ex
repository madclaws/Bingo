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

  # server functions
  @impl true
  def create(opts) do
    IO.puts("Created Bingo room #{inspect opts}")
    setup_room_state(opts)
  end

  @impl true
  def handle_call({"player_join", player_id}, _from, state) do
    {board, board_index} = CoreUtils.generate_random_bingo_board()
    state = put_in state["players"][player_id], %{"board" => board, "index" => board_index, "bingo_list" => []}
    DingoWeb.Endpoint.broadcast!(get_channel(), "game_board", %{board: board, index: board_index})
    IO.puts("on_join update #{inspect state}")
    {:reply, state, state}
  end

  @impl true
  def handle_call({"player_move", cell, player_id}, _from, state) do
    # Validate the player's turn (which will be doing later)
    # Validate the cell is not checked yet.
    player_data = state["players"][player_id]
    {_board_status, _player_data} = is_checked_already?(cell, player_data)
    |> update_player_board(cell, player_data)
    |> check_bingo()
    # update the player's board.
    # Do the bingo check.
    {:reply, "ok", state}
  end

  # Helper functions
  defp setup_room_state([room_id: roomid, player_id: _playerid] = _opts) do
    %{
      "room_id" => roomid,
      "players" => %{}
    }
  end

  defp is_checked_already?([row, col] = _cell, player_data) do
    player_data["board"][row][col]
  end

  defp update_player_board(false, cell, player_data) do
    [row, col] = cell
    player_data = put_in player_data["board"][row][col]["check"], true
    {"valid", player_data}
  end

  defp update_player_board(_, _cell, player_data) do
    {"invalid", player_data}
  end

  defp check_bingo({"valid", _player_data}) do

  end

  defp check_bingo(data), do: data

end
