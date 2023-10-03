import React from "react";
import { gql, ApolloClient, useQuery, useApolloClient } from "@apollo/client";

export const FRAGMENT = `
  {
    id
    fullName
    title
    avatarUrl
  }
`;

export interface Person {
  id: string;
  fullName: string;
  title: string;
  avatarUrl: string;

  sendDailySummary: boolean;
  notifyOnMention: boolean;
  notifyAboutAssignments: boolean;
}

export function createProfile(client: ApolloClient<any>, fullName: string, title: string) {
  return client.mutate({
    mutation: gql`
      mutation CreateProfile($fullName: String!, $title: String!) {
        createProfile(fullName: $fullName, title: $title) {
          id
        }
      }
    `,
    variables: {
      fullName,
      title,
    },
  });
}

const SEARCH_PEOPLE = gql`
  query SearchPeople($query: String!) {
    searchPeople(query: $query) {
      id
      fullName
      title
      avatarUrl
    }
  }
`;

export function usePeopleSearch() {
  const client = useApolloClient();

  //
  // There are multiple components that use this hook. Some of them
  // pass in a string, others pass in an object with a query property.
  // These components are not maintained in this repo, so we can't
  // change them easily to all use the same format.
  //
  // This is a bit of a hack to make it work with both.
  //
  return async (arg: string | { query: string }): Promise<Person[]> => {
    let query = "";

    if (typeof arg === "string") {
      query = arg;
    } else {
      query = arg.query;
    }

    const res = await client.query({
      query: SEARCH_PEOPLE,
      variables: {
        query: query,
      },
    });

    if (!res.data) return [];
    if (!res.data.searchPeople) return [];

    return res.data.searchPeople as Person[];
  };
}

const debounce = (callback: any, wait: number) => {
  let timeoutId: number | null = null;

  return (...args: any[]) => {
    if (timeoutId) window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export function useDebouncedPeopleSearch(query: string) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, loading, error } = usePeopleSearch(searchQuery);

  const debouncedSetSearchQuery = React.useMemo(() => {
    return debounce((q: any) => {
      setSearchQuery(q);
    }, 500);
  }, []);

  return {
    data,
    loading,
    error,
    setSearchQuery: debouncedSetSearchQuery,
  };
}

const GET_PERSON = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      fullName
      title
      avatarUrl
    }
  }
`;

export function usePerson(id: string) {
  return useQuery(GET_PERSON, {
    variables: { id },
  });
}
