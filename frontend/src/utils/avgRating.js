const calculateAvgRating = (reviews) => {
    const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);

    if (reviews?.length === 0) {
        return {
            totalRating: 0,
            avgRating: ''
        };
    }

    const avgRating =
        totalRating === 1
            ? totalRating
            : (totalRating / reviews.length).toFixed(1);

    return {
        totalRating,
        avgRating
    };
};

export default calculateAvgRating;
