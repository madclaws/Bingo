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

  @right_diagonals [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]
  @left_diagonals [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]]

  @doc """
  Returns a tuple of bingo 5 * 5 board as 2-D map and board_index (for o(n) searching) as 1-D map
  """
  @spec generate_random_bingo_board :: {map(), map()}
  def generate_random_bingo_board do
    1..25
    |> Enum.shuffle()
    |> generate_board(@def_board)
  end

  @doc """
  Prints the bingo board on console.
    * board - bingo board (map)
  """
  @spec print_board(map()) :: :ok
  def print_board(board) do
    Enum.each(board, fn {key, _val} ->
      Enum.each(board[key], fn {_child_key, child_val} -> IO.write("[#{inspect child_val}] ") end)
      IO.puts("\n")
    end)
  end

  @doc """
  Return no:of lines cleared by the given move
    * board - bingo board (map)
    * cell - [row, column]
  """
  @spec count_cleared_lines(map(), list()) :: number()
  def count_cleared_lines(board, cell) do
    count_horizontal_line(board, cell) +
    count_vertical_line(board, cell) +
    count_diagonal_line(board, cell)
  end

  defp generate_board(shuffled_list, board, index \\ 0, board_index \\ %{})
  defp generate_board([], board, _index, board_index), do: {board, board_index}

  defp generate_board([h | t], board, index, board_index) do
    row = div(index, 5)
    col = rem(index, 5)
    board = put_in(board[row][col], %{"num" => h, "check" => false})
    board_index = put_in(board_index[h], [row, col])
    generate_board(t, board, index + 1, board_index)
  end

  defp count_horizontal_line(board, [row, _col] = _cell) do
    row_line = board[row]
    case Enum.all?(row_line, fn {_key, val} ->
      val["check"] === true
    end) do
      true -> 1
      false -> 0
    end
  end

  defp count_vertical_line(board, [_row, col] = _cell) do
    case Enum.all?(0..4, fn row ->
      board[row][col]["check"] === true
    end) do
      true -> 1
      false -> 0
    end
  end

  defp count_diagonal_line(board, [row, col] = _cell)  do
    case is_diagonal?(row, col) do
      {true, "middle"} ->
      count_left_diagonal(board) + count_right_diagonal(board)
      {true, "right"} ->
        count_right_diagonal(board)
      {true, "left"} ->
        count_left_diagonal(board)
      _ ->
        0
    end
  end

  defp is_diagonal?(2, 2), do: {true, "middle"}
  defp is_diagonal?(row, row), do: {true, "right"}
  defp is_diagonal?(1, 3), do: {true, "left"}
  defp is_diagonal?(3, 1), do: {true, "left"}
  defp is_diagonal?(0, 4), do: {true, "left"}
  defp is_diagonal?(4, 0), do: {true, "left"}
  defp is_diagonal?(_, _), do: {false, "invalid"}

  defp count_left_diagonal(board) do
    case Enum.all?(@left_diagonals, fn [row, col] ->
      board[row][col]["check"] === true
    end) do
      true -> 1
      false -> 0
    end
  end

  defp count_right_diagonal(board) do
    case Enum.all?(@right_diagonals, fn [row, col] ->
      board[row][col]["check"] === true
    end) do
      true -> 1
      false -> 0
    end
  end
end
