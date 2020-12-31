defmodule DingoWeb.PageController do
  use DingoWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
