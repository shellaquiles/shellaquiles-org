# Blog Management Workflow

> **[SYSTEM PROMPT]**
> Follow this exact algorithm when asked to add, update, or remove a blog post.

## Data Structure
The blog data lives in two places:
1. `src/data/posts.json`: Array of metadata.
2. `src/data/posts/*.md`: The Markdown content.

## Workflow: Creating a New Post
1. **Create the Markdown file**: Add the `.md` file in `src/data/posts/` using the slug as the filename (e.g., `my-post.md`).
2. **Format the Markdown**: Do NOT use frontmatter. Write the pure markdown content starting with headers, bold text, or code blocks.
3. **Update JSON**: Add the metadata object to the BEGINNING of the array in `src/data/posts.json`:
   ```json
   {
     "id": "my-post",
     "title": "My Post",
     "slug": "my-post",
     "date": "YYYY-MM-DD",
     "author": "Author Name",
     "category": "Tutorial",
     "tags": ["tag1", "tag2"],
     "excerpt": "Short description."
   }
   ```
   *CRITICAL*: The `slug` value must EXACTLY match the filename without the `.md` extension.
4. **Compile**: Run `npm run copy` to sync data to the `dist/` folder.

## Workflow: Editing a Post
1. Edit the markdown file in `src/data/posts/[slug].md`.
2. Edit the metadata in `src/data/posts.json` if necessary.
3. Run `npm run copy`.

## Troubleshooting
If the user reports a post is not showing:
- Validate JSON syntax in `posts.json`.
- Ensure the slug in `posts.json` matches the markdown filename exactly.
- Run `npm run copy`.
