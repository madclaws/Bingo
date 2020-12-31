defmodule Dingo.CoreUtils do
  @moduledoc """
  Utility functions for core gameplay
  """
  @def_board %{
    0 => %{0 => nil, 1 => nil, 2 => nil, 3 => nil, 4 => nil},
    1 => %{0 => nil, 1 => nil, 2 => nil, 3 => nil, 4 => nil},
    2 => %{0 => nil, 1 => nil, 2 => nil, 3 => nil, 4 => nil},
    3 => %{0 => nil, 1 => nil, 2 => nil, 3 => nil, 4 => nil},
    4 => %{0 => nil, 1 => nil, 2 => nil, 3 => nil, 4 => nil}
  }

  @doc """
  Returns a bingo 5 * 5 board as 2-D map and board_index (for o(n) searching) as 1-D map
  """
  @spec generate_random_bingo_board :: {map(), map()}
  def generate_random_bingo_board do
    1..25
    |> Enum.shuffle()
    |> generate_board(@def_board)
  end

  defp generate_board(shuffled_list, board, index \\ 0, board_index \\ %{})
  defp generate_board([], board, _index, board_index), do: {board, board_index}

  defp generate_board([h | t], board, index, board_index) do
    row = div(index, 5)
    col = rem(index, 5)
    board = put_in(board[row][col], %{num: h, check: false})
    board_index = put_in(board_index[h], {row, col})
    generate_board(t, board, index + 1, board_index)
  end
end
