const calculateAvgRating = (reviews) => {
    const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);

    if (reviews && reviews?.length === 0) {
        return {
            totalRating: 0,
            avgRating: ''
        };
    }

    const avgRating =
        totalRating === 1
            ? totalRating
            : parseFloat(
                  (totalRating / reviews ? reviews.length : 0).toFixed(1)
              );

    return {
        totalRating,
        avgRating
    };
};

export default calculateAvgRating;
