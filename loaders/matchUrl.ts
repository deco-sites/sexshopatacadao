export default function matchUrlLoader<T extends Array<{ matcher: string }>>(
  items: T,
  req: Request,
) {
  const matched = items.reduce((bestMatch, item: T[number]) => {
    const { matcher } = item;
    const test = new URLPattern({ pathname: matcher }).test(req.url);

    if (
      test &&
      (!bestMatch || matcher.length > bestMatch.matcher.length)
    ) {
      return item;
    } else {
      return bestMatch;
    }
  }, null as T[number] | null);

  return matched;
}
