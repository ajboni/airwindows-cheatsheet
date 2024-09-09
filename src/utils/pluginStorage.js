const getPluginData = (pluginName) => {
  const data = localStorage.getItem(pluginName);
  return data ? JSON.parse(data) : { isFavorite: false, notes: "" };
};

const setPluginData = (pluginName, data) => {
  localStorage.setItem(pluginName, JSON.stringify(data));
};

export const isFavorite = (pluginName) => {
  return getPluginData(pluginName).isFavorite;
};

export const toggleFavorite = (pluginName) => {
  const data = getPluginData(pluginName);
  data.isFavorite = !data.isFavorite;
  setPluginData(pluginName, data);
  return data.isFavorite;
};

export const getFavorites = () => {
  return Object.keys(localStorage).filter((pluginName) => {
    try {
      const data = JSON.parse(localStorage.getItem(pluginName));
      return data && data.isFavorite;
    } catch {
      return false;
    }
  });
};

export const getNotes = (pluginName) => {
  return getPluginData(pluginName).notes;
};

export const setNotes = (pluginName, notes) => {
  const data = getPluginData(pluginName);
  data.notes = notes;
  setPluginData(pluginName, data);
};
