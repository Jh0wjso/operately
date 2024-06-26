defmodule OperatelyWeb.Graphql.TypeHelpers do
  use Absinthe.Schema.Notation

  defmacro json_field(field_name, field_type) do
    quote do
      field unquote(field_name), unquote(field_type) do
        resolve fn db_record, _, _ ->
          db_field = Map.get(db_record, unquote(field_name))

          case db_field do
            nil -> {:ok, nil}
            _ -> {:ok, Jason.encode!(db_field)}
          end
        end
      end
    end
  end

  defmacro assoc_field(assoc_name, field_type) do
    quote do
      field unquote(assoc_name), unquote(field_type) do
        resolve fn db_record, _, _ ->
          db_record = Operately.Repo.preload(db_record, unquote(assoc_name))
          assoc = Map.get(db_record, unquote(assoc_name))

          {:ok, assoc}
        end
      end
    end
  end

  defmacro delegate_field(field_name, field_type, handler) do
    quote do
      field unquote(field_name), unquote(field_type) do
        resolve fn db_record, _, _ ->
          case unquote(handler).(db_record) do
            nil -> {:ok, nil}
            {:error, e} -> {:error, e}
            {:ok, value} -> {:ok, value}
            value -> {:ok, value}
          end
        end
      end
    end
  end

  defmacro activity_content_field(field_name, field_type) do
    quote do
      field unquote(field_name), unquote(field_type) do
        resolve fn activity, _, _ ->
          {:ok, activity.content[Atom.to_string(unquote(field_name))]}
        end
      end
    end
  end

end
