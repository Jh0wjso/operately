defmodule OperatelyWeb.GraphQL.Types.ProjectReviewRequests do
  use Absinthe.Schema.Notation

  object :project_review_request do
    field :id, non_null(:id)

    field :inserted_at, non_null(:date)
    field :updated_at, non_null(:date)

    field :content, non_null(:string) do
      resolve fn req, _, _ ->
        {:ok, Jason.encode!(req.content)}
      end
    end

    field :author, :person do
      resolve fn req, _, _ ->
        req = Operately.Repo.preload(req, :author)

        {:ok, req.author}
      end
    end
  end
end