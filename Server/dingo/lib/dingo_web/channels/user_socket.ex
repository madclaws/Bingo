defmodule DingoWeb.UserSocket do
  use Garuda.GameSocket

  game_channel "bingo", DingoWeb.BingoChannel, Dingo.BingoRoom

  @impl true
  def id(_socket), do: nil
end
