function ProductDescription({ description }) {
  if (!description) return null;

  const sections = description
    .split("\n\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  return (
    <div className="kging-product-description">
      {sections.map((section, index) => {
        const lines = section
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "");

        const title = lines[0] || "";
        const content = lines.slice(1).join("\n");

        return (
          <div key={index} className="kging-product-description-section">
            {title && (
              <h4 className="kging-product-description-subtitle">{title}</h4>
            )}
            {content && (
              <p className="kging-product-description-paragraph">{content}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductDescription;
