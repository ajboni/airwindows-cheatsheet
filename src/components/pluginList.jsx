import React from "react";

function PluginList({ db, filter }) {
  const filteredPlugins = filter === "All" ? db.plugins : db.plugins.filter((x) => x.category === filter);
  console.log(db);
  console.log(filteredPlugins);
  return <div>==={filter}===</div>;
}

export default PluginList;
