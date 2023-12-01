import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  if (!searchbar) {
    return null;
  }

  return <Searchbar {...searchbar} />;
}

export default SearchbarModal;
