import { useEffect } from 'react'

type HeadProps = {
  title: string
  description?: string
  ogType?: string
  canonicalUrl?: string
}

export function useDocumentHead({ title, description, ogType = 'website', canonicalUrl }: HeadProps) {
  useEffect(() => {
    // Set title
    const fullTitle = title.includes('Dzaky Razi') ? title : `${title} | Dzaky Razi`
    document.title = fullTitle

    // Set or create meta tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = content
    }

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:type', ogType)

    if (canonicalUrl || typeof window !== 'undefined') {
      const url = canonicalUrl || window.location.href
      setMeta('property', 'og:url', url)
    }
  }, [title, description, ogType, canonicalUrl])
}

export default useDocumentHead
