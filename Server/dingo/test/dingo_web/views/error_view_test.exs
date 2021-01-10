defmodule DingoWeb.ErrorViewTest do
  use DingoWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  @tag :skip
  test "renders 404.html" do
    assert render_to_string(DingoWeb.ErrorView, "404.html", []) == "Not Found"
  end

  @tag :skip
  test "renders 500.html" do
    assert render_to_string(DingoWeb.ErrorView, "500.html", []) == "Internal Server Error"
  end
end
