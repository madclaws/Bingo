 defmodule Dingo.CoreUtilsTest do
  @moduledoc false
  use ExUnit.Case
  alias Dingo.CoreUtils

  @board_test %{
   0 => %{0 => %{"check" => false, "num" => 12}, 1 => %{"check" => false, "num" => 2}, 2 => %{"check" => false, "num" => 21}, 3 => %{"check" => false, "num" => 11}, 4 => %{"check" => false, "num" => 24}},
   1 => %{0 => %{"check" => false, "num" => 18}, 1 => %{"check" => false, "num" => 6}, 2 => %{"check" => false, "num" => 15}, 3 => %{"check" => false, "num" => 10}, 4 => %{"check" => false, "num" => 20}},
   2 => %{0 => %{"check" => false, "num" => 4}, 1 => %{"check" => false, "num" => 23}, 2 => %{"check" => false, "num" => 7}, 3 => %{"check" => false, "num" => 14}, 4 => %{"check" => false, "num" => 25}},
   3 => %{0 => %{"check" => false, "num" => 19}, 1 => %{"check" => false, "num" => 13}, 2 => %{"check" => false, "num" => 1}, 3 => %{"check" => false, "num" => 17}, 4 => %{"check" => false, "num" => 3}},
   4 => %{0 => %{"check" => false, "num" => 5}, 1 => %{"check" => false, "num" => 22}, 2 => %{"check" => false, "num" => 9}, 3 => %{"check" => false, "num" => 8}, 4 => %{"check" => false, "num" => 16}}
  }

  setup do
    board = @board_test
    {:ok, [board: board]}
  end

  test "count_horizontal_line on [0][0] (success case)", context do
    board = context[:board]
    board = put_in board[0][0], %{"check" => true, "num" => 12}
    board = put_in board[0][1], %{"check" => true, "num" => 2}
    board = put_in board[0][2], %{"check" => true, "num" => 21}
    board = put_in board[0][3], %{"check" => true, "num" => 11}
    board = put_in board[0][4], %{"check" => true, "num" => 24}

    assert CoreUtils.count_cleared_lines(board, [0, 0]) === 1
  end

  test "count_horizontal_line on row [0][3] (fail case)", context do
    board = context[:board]
    board = put_in board[0][0], %{"check" => true, "num" => 12}
    board = put_in board[0][1], %{"check" => true, "num" => 2}
    board = put_in board[0][2], %{"check" => false, "num" => 21}
    board = put_in board[0][3], %{"check" => true, "num" => 11}
    board = put_in board[0][4], %{"check" => true, "num" => 24}

    assert CoreUtils.count_cleared_lines(board, [0, 3]) === 0
  end

  test "count_vertical_line on row [0][1] (fail case)", context do
    board = context[:board]
    board = put_in board[0][1], %{"check" => true, "num" => 2}
    board = put_in board[1][1], %{"check" => true, "num" => 6}
    board = put_in board[2][1], %{"check" => false, "num" => 23}
    board = put_in board[3][1], %{"check" => true, "num" => 13}
    board = put_in board[4][1], %{"check" => true, "num" => 22}

    assert CoreUtils.count_cleared_lines(board, [0, 1]) === 0
  end

  test "count_vertical_line on row [0][1] (success case)", context do
    board = context[:board]
    board = put_in board[0][1], %{"check" => true, "num" => 2}
    board = put_in board[1][1], %{"check" => true, "num" => 6}
    board = put_in board[2][1], %{"check" => true, "num" => 23}
    board = put_in board[3][1], %{"check" => true, "num" => 13}
    board = put_in board[4][1], %{"check" => true, "num" => 22}

    assert CoreUtils.count_cleared_lines(board, [0, 1]) === 1
  end

  test "count_diagonal_line on row [1][0] (a non diagonal case)", context do
    board = context[:board]
    board = put_in board[1][0], %{"check" => true, "num" => 18}

    assert CoreUtils.count_cleared_lines(board, [1, 0]) === 0
  end

  test "count_diagonal_line on row [2][2] (middle-diagonal with left clearing case)", context do
    board = context[:board]
    board = put_in board[0][0], %{"check" => true, "num" => 2}
    board = put_in board[1][1], %{"check" => true, "num" => 6}
    board = put_in board[2][2], %{"check" => true, "num" => 23}
    board = put_in board[3][3], %{"check" => true, "num" => 13}
    board = put_in board[4][4], %{"check" => true, "num" => 22}

    assert CoreUtils.count_cleared_lines(board, [2, 2]) === 1
  end

  test "count_diagonal_line on row [2][2] (middle-diagonal with right clearing case)", context do
    board = context[:board]
    board = put_in board[0][4], %{"check" => true, "num" => 2}
    board = put_in board[1][3], %{"check" => true, "num" => 6}
    board = put_in board[2][2], %{"check" => true, "num" => 23}
    board = put_in board[3][1], %{"check" => true, "num" => 13}
    board = put_in board[4][0], %{"check" => true, "num" => 22}

    assert CoreUtils.count_cleared_lines(board, [2, 2]) === 1
  end

  test "count_diagonal_line on row [2][2] (middle-diagonal with left and right clearing case)", context do
    board = context[:board]

    board = put_in board[0][0], %{"check" => true, "num" => 2}
    board = put_in board[1][1], %{"check" => true, "num" => 6}
    board = put_in board[2][2], %{"check" => true, "num" => 23}
    board = put_in board[3][3], %{"check" => true, "num" => 13}
    board = put_in board[4][4], %{"check" => true, "num" => 22}

    board = put_in board[0][4], %{"check" => true, "num" => 2}
    board = put_in board[1][3], %{"check" => true, "num" => 6}
    board = put_in board[3][1], %{"check" => true, "num" => 13}
    board = put_in board[4][0], %{"check" => true, "num" => 22}

    assert CoreUtils.count_cleared_lines(board, [2, 2]) === 2
  end
 end
