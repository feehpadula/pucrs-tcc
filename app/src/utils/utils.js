export function mapRoutes(rawRoutes, position) {
  let routes = [];

  rawRoutes.map((rawRoute) => {
    return (
      rawRoute.position === position &&
      routes.push({ label: rawRoute.label, path: rawRoute.path })
    );
  });

  return routes;
}
