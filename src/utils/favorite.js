const FAVORITE_KEY = "kging_favorites";

export function getFavorites() {
  const data = localStorage.getItem(FAVORITE_KEY);  
  return data ? JSON.parse(data) : []; //如果 data 有值，就把字串轉回陣列
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
}

//檢查某個商品 id 有沒有在最愛清單裡
export function isFavorite(productId) {
  const favorites = getFavorites();
  return favorites.includes(productId);
}

//切換收藏狀態，更新收藏清單
export function toggleFavorite(productId) {
  const favorites = getFavorites();

  const updatedFavorites = favorites.includes(productId)
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];

  saveFavorites(updatedFavorites);
  return updatedFavorites;
}
