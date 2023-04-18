defmodule Operately.UpdatesTest do
  use Operately.DataCase

  alias Operately.Updates

  describe "updates" do
    alias Operately.Updates.Update

    import Operately.UpdatesFixtures

    @invalid_attrs %{content: nil, updatable_id: nil, updatable_type: nil}

    test "list_updates/0 returns all updates" do
      {update, _} = update_fixture(:with_author, %{})

      assert Updates.list_updates() == [update]
    end

    test "get_update!/1 returns the update with given id" do
      {update, _} = update_fixture(:with_author, %{})

      assert Updates.get_update!(update.id) == update
    end

    test "create_update/1 with valid data creates a update" do
      person = Operately.PeopleFixtures.person_fixture()

      valid_attrs = %{
        content: "some content",
        updatable_id: "7488a646-e31f-11e4-aace-600308960662",
        updatable_type: :objective,
        author_id: person.id
      }

      assert {:ok, %Update{} = update} = Updates.create_update(valid_attrs)
      assert update.content == "some content"
      assert update.updatable_id == "7488a646-e31f-11e4-aace-600308960662"
      assert update.updatable_type == :objective
    end

    test "create_update/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Updates.create_update(@invalid_attrs)
    end

    test "update_update/2 with valid data updates the update" do
      {update, _} = update_fixture(:with_author, %{})
      update_attrs = %{content: "some updated content", updatable_id: "7488a646-e31f-11e4-aace-600308960668", updatable_type: :project}

      assert {:ok, %Update{} = update} = Updates.update_update(update, update_attrs)
      assert update.content == "some updated content"
      assert update.updatable_id == "7488a646-e31f-11e4-aace-600308960668"
      assert update.updatable_type == :project
    end

    test "update_update/2 with invalid data returns error changeset" do
      {update, _} = update_fixture(:with_author, %{})

      assert {:error, %Ecto.Changeset{}} = Updates.update_update(update, @invalid_attrs)
      assert update == Updates.get_update!(update.id)
    end

    test "delete_update/1 deletes the update" do
      {update, _} = update_fixture(:with_author, %{})
      assert {:ok, %Update{}} = Updates.delete_update(update)
      assert_raise Ecto.NoResultsError, fn -> Updates.get_update!(update.id) end
    end

    test "change_update/1 returns a update changeset" do
      {update, _} = update_fixture(:with_author, %{})
      assert %Ecto.Changeset{} = Updates.change_update(update)
    end
  end

  describe "comments" do
    alias Operately.Updates.Comment

    import Operately.UpdatesFixtures

    @invalid_attrs %{content: nil}

    test "list_comments/0 returns all comments" do
      {comment, update, _} = comment_fixture(:with_update, :with_author, %{})
      assert Updates.list_comments(update.id) == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      {comment, _, _} = comment_fixture(:with_update, :with_author, %{})
      assert Updates.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      {update, author} = update_fixture(:with_author, %{})

      valid_attrs = %{
        content: "some content",
        author_id: author.id,
        update_id: update.id
      }

      assert {:ok, %Comment{} = comment} = Updates.create_comment(valid_attrs)
      assert comment.content == "some content"
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Updates.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      {comment, _, _} = comment_fixture(:with_update, :with_author, %{})
      update_attrs = %{content: "some updated content"}

      assert {:ok, %Comment{} = comment} = Updates.update_comment(comment, update_attrs)
      assert comment.content == "some updated content"
    end

    test "update_comment/2 with invalid data returns error changeset" do
      {comment, _, _} = comment_fixture(:with_update, :with_author, %{})
      assert {:error, %Ecto.Changeset{}} = Updates.update_comment(comment, @invalid_attrs)
      assert comment == Updates.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      {comment, _, _} = comment_fixture(:with_update, :with_author, %{})
      assert {:ok, %Comment{}} = Updates.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Updates.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      {comment, _, _} = comment_fixture(:with_update, :with_author, %{})
      assert %Ecto.Changeset{} = Updates.change_comment(comment)
    end
  end
end