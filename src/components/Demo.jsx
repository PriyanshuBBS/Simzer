import React from 'react'
import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from "../assets";
// useLazyGetSummaryQuery is a hook
import { useLazyGetSummaryQuery } from '../services/article';

function Demo() {

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  // articles array to store all articles
  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

  // storing the history in local storage
  useEffect(() => {
    // setting extracting the data
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    // if getting the data then setting it in array
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    // checking whether getting something or not
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      // updating the all Article array
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      // pushing to update the article
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  }

  // adding copy to clipboard function
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />

          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              // when to retrive the old article's summary
              onClick={() => setArticle(item)}
              className='link_card'>
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>

                {/* Changing icon based on copied/not */}
                <img 
                src={copied === item.url ? tick : copy} 
                alt="copy_icon"
                  className='w-[40%] h-[40%] object-contain' />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {/* if data is available */}
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          // If there is error
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          // If data is fetched sucessfully
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo