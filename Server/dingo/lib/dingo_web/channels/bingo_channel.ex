defmodule DingoWeb.BingoChannel do
  @moduledoc """
    handler
  """
  use Garuda.GameChannel

  def on_join(_params, _socket) do

  end

  def authorized?(_params) do
    true
  end

  def on_leave(_reason, _socket) do

  end



end
