const sortedProducts = (data, sortKey) => {
  switch (sortKey) {
    case "high-to-low":
      return data.sort((a, b) => b.price - a.price);
    case "low-to-high":
      return data.sort((a, b) => a.price - b.price);
    case "new-to-old":
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "old-to-new":
      return data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return data;
  }
};

const searchingProducts = (data, searchTerm) => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getFilteredProducts = (data, filters) => {
  const { searchTerm, orderBy, brands, models } = filters;

  const searchedProducts = searchingProducts(data, searchTerm);

  const filteredProducts = searchedProducts.filter((item) => {
    const brandMatches = brands.length === 0 || brands.includes(item.brand);
    const modelMatches = models.length === 0 || models.includes(item.model);

    return brandMatches && modelMatches;
  });

  return sortedProducts(filteredProducts, orderBy);
};

export const capitalize = (str) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const removeDuplicateValues = (data) => {
  return Array.from(new Set(data.map((item) => item.value))).map((value) =>
    data.find((item) => item.value === value)
  );
};
