import all from "./posts/*.md";

function byDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

export default all.filter((post) => post.data.published == true).sort(byDate);
