export const getPickupTimeColor = (time) => {
    const currentTime = new Date().getTime();
    const pickupTime = new Date(time).getTime();

    // calculate the time difference in hours
    const timeDiff = (pickupTime - currentTime) / (60 * 60 * 1000);

    if ( pickupTime === 0) {
        return "N/A";
    }

    if (timeDiff < 1) {
        return (
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-800">
                {time}
            </span>
        );
    } else if (timeDiff < 2) {
        return (
            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                {time}
            </span>
        );
    } else {
        return (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                {time}
            </span>
        );
    }
};

