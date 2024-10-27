import React from "react";

const NewsCard = ({
  source,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) => {
  return (
    <div
      className="bg-gray-900 text-white rounded-lg p-6 shadow-lg max-w-xl mx-auto mb-6 pt-[300px]"
      style={{
        backgroundImage: urlToImage ? `url(${urlToImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-gray-900 bg-opacity-80 p-4 rounded-lg space-y-2"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <p className="text-sm text-gray-400">
          {new Date(publishedAt).toLocaleDateString()} by {author}
        </p>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-base text-gray-300">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mt-4 block"
        >
          Read more on {source.name}
        </a>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">
            News
          </span>
          <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">
            Law
          </span>
          <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">
            Sustainability
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;