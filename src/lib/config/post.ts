import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
    comment: {
        use: ['Giscus'],
        style: 'boxed', // comment system bar styles: none / bordered / lifted / boxed
        giscus: {
          repo: 'iameyad/blog',
          repoID: 'R_kgDOLpER2w',
          category: 'General',
          categoryID: 'DIC_kwDOLpER284Ceb9G',
          reactionsEnabled: true, // reactions: true / false
          inputPosition: 'top', // position of comment box: top / bottom
          lang: 'en', // language
          theme: 'preferred_color_scheme' // theme
        }
      }
}
