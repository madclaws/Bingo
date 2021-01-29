defmodule DingoWeb.BingoChannel do
  @moduledoc """
    handler
  """
  use Garuda.GameChannel
  alias Dingo.BingoRoom
  @impl true

  # the lint error, no becuase of the params we passed.
  # But when we use push/broadcast
  def on_join(_params, socket) do
    IO.puts("Player joined bingo room => #{inspect socket.assigns.player_id}")
    {can_start_battle, next_turn, board_state} = BingoRoom.on_player_join(id(socket),
      socket.assigns.player_id)
    push(socket, "game_board", board_state)
    if can_start_battle do
      IO.puts("Lets start battle")
      broadcast!(socket, "start_battle", %{"next_turn" => next_turn})
    end
  end

  @impl true
  def on_rejoin(_params, socket) do
    IO.puts("Player rejoined bingo room => #{inspect socket.assigns.player_id}")
    BingoRoom.on_player_rejoin(id(socket), socket.assigns.player_id)
  end

  @impl true
  def handle_in("player_move", cell, socket) do
    BingoRoom.on_player_move(id(socket), socket.assigns.player_id, cell)
    {:noreply, socket}
  end

  @impl true
  def authorized?(params) do
    IO.puts(inspect(params))
    true
  end


end
