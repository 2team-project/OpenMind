import React, { useEffect, useRef } from 'react'

const InfiniteScroll = ({ children, onLoadMore }) => {
  const observer = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore()
      }
    }, options)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [onLoadMore])

  const lastElementRef = useRef(null)

  useEffect(() => {
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current)
    }
  }, [lastElementRef])

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (React.Children.count(children) === index + 1) {
          return React.cloneElement(child, { ref: lastElementRef })
        } else {
          return child
        }
      })}
    </>
  )
}

export default InfiniteScroll
