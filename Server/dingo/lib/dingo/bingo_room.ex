defmodule Dingo.BingoRoom do
  @moduledoc """
  Game room module for Bingo game
  """

  use Garuda.GameRoom

  @impl true
  def create(opts) do
    IO.puts("Created Bingo room #{inspect opts}")
    %{}
  end
end
