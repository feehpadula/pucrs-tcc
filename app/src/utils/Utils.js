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

export function validateField(field01, field02 = field01, required = true) {
  return (required
    ? field01 !== null && field01 !== "" && field02 !== null && field02 !== ""
      ? true
      : false
    : true) && field01 === field02
    ? true
    : false;
}
