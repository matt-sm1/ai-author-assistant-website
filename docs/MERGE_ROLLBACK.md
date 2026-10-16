# Rollback (merge/cms-into-website)

If cutover fails:
1. Restore vercel.json rewrites to author-ai-assistant.vercel.app/blogs
2. Redeploy ai-author-assistant-website
3. Keep author-ai-assistant Vercel project running until blogs work again

Do not delete the old project until smoke tests pass.
