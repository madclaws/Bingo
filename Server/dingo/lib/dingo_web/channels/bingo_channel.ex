defmodule DingoWeb.BingoChannel do
  @moduledoc """
    handler
  """
  use Garuda.GameChannel
  alias Dingo.BingoRoom
  def on_join(_params, socket) do
    IO.puts("Player joined bingo room => #{inspect socket.assigns.player_id}")
    BingoRoom.on_player_join(id(socket), socket.assigns.player_id)
  end

  def authorized?(_params) do
    true
  end

  def on_leave(_reason, _socket) do

  end



end
