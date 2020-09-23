<script context="module">
  export async function preload() {
    const res = await this.fetch(`blog.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { posts: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let posts;

  let infos = [
    {
      link: "//github.com/sbaudray",
      text: "github",
    },
    {
      link: "//twitter.com/sbaudray",
      text: "twitter",
    },
    {
      link: "//linkedin.com/in/sebastien-baudray",
      text: "linkedin",
    },
  ];

  function formatDate(date) {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("default", options).format(new Date(date));
  }
</script>

<style>
  h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 900;
  }

  .profile {
    font-style: italic;
  }

  .blog-item {
    display: grid;
  }

  .blog-item-link {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
  }

  .blog-item-date {
    font-size: 0.9rem;
  }

  .info-item {
    display: inline;
  }

  .info-item:not(:last-child)::after {
    content: "• ";
  }

  .info-item + .info-item {
    margin-top: 0.5rem;
  }

  section {
    margin-top: 3rem;
  }

  footer {
    border-top: 1px dashed lightgray;
  }
</style>

<svelte:head>
  <title>sbaudray</title>
  <meta
    name="description"
    content="Blog by Sebastien Baudray. Writing about web dev mostly" />
</svelte:head>

<h1>sbaudray</h1>

<div class="profile">Writing about things...sometimes</div>

<section>
  <ul>
    {#each posts as post}
      <li class="blog-item">
        <h2>
          <a
            class="blog-item-link"
            href="blog/{post.slug}">{post.data.title}</a>
        </h2>
        <span class="blog-item-date">{formatDate(post.date)}</span>
        <span class="blog-item-desc">{post.data.description}</span>
      </li>
    {/each}
  </ul>
</section>
<footer>
  <ul>
    {#each infos as info}
      <li class="info-item">
        <a
          href={info.link}
          target="_blank"
          rel="noopener noreferrer">{info.text}</a>
      </li>
    {/each}
  </ul>
</footer>
