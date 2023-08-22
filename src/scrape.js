import { writeFileSync } from "fs";
getAirwindopedia();

async function getAirwindopedia() {
  const airwindopediaURL =
    "https://www.airwindows.com/wp-content/uploads/Airwindopedia.txt";

  const request = await fetch(airwindopediaURL);
  const content = await request.text();
  // Keeping 2 # for easier regex later on
  const entriesSeparator = "##########";
  const database = {
    plugins: [],
    categories: {},
  };

  const tempCategoryDB = {};
  const entries = content.split(entriesSeparator);
  const intro = entries.shift();
  const categoriesText = intro.split("# Categories")[1];
  const categoriesRegex = /^([\w]{1}[\w\s\-]+):(.+)$/gm;
  const categoriesMatches = categoriesText.matchAll(categoriesRegex);

  // Get plugin names and categories
  for (const match of categoriesMatches) {
    const category = match[1].trim();
    database.categories[category] = [];
    const categoryEntries = match[2]
      .replace(".", ",")
      .split(",")
      .map((e) => e.trim());
    for (const plugin of categoryEntries) {
      database.categories[category].push(plugin);

      // Save this for easier matching.
      tempCategoryDB[plugin] = category;
    }
  }

  // Get Plugin short and long description and a matching category;
  for (const plugin of entries) {
    const titleMatch = plugin.match(/^(##\s((\w+)\s.+$))/m);
    const title = titleMatch[3].trim();
    const shortDescription = titleMatch[2].trim();
    const description = plugin.replace(titleMatch[1], "").trim();
    const category = tempCategoryDB[title] || null;

    database.plugins.push({
      name: title,
      shortDescription: shortDescription,
      description: description,
      category: category,
    });
  }

  try {
    writeFileSync("./src/database.json", JSON.stringify(database, null, 2));
    console.log(
      `database.json written: ${database.plugins.length} plugins scraped. `
    );
  } catch (error) {
    console.error(error);
  }
}
