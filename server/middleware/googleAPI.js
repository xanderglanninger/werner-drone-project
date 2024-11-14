function generateEmbeddedGoogleMapsLink(latitude, longitude) {
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyBipMP0V5BocGHOIhzGj-tJbccf7mru-es&center=${latitude},${longitude}&zoom=14&maptype=satellite`;
}

export default generateEmbeddedGoogleMapsLink;