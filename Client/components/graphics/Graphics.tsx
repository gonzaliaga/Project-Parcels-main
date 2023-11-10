const Graphics = () => {
  const iframeStyle = {
    background: "#fff",
    border: "none",
    borderRadius: "2px",
    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
    width: "100vw"
  }

  return (
    <>
      <iframe
        style={iframeStyle}
        src="https://charts.mongodb.com/charts-project-0-wptzs/embed/dashboards?id=c2f69b98-5f28-46c1-8f89-012f4abfabad&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
      ></iframe>
    </>
  )
}

export default Graphics
