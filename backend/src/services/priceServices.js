const { Op } = require('sequelize'); 
const Price = require('../entity/prices');
const Flight = require('../entity/flights');

//ghep front end phai cho mac dinh chay doan code nay de cap nhat gia 
const updatePrice = async () => {
    try {
        const currentDate = new Date();

        // Lấy danh sách tất cả các chuyến bay
        const flights = await Flight.findAll();

        // Lặp qua từng chuyến bay để tính toán và cập nhật giá
        for (const flight of flights) {
            const {flight_id} = flight.dataValues;
            const departureTime = new Date(flight.departure_time);
            const diffDays = Math.ceil((departureTime - currentDate) / (1000 * 60 * 60 * 24));

            // Tính hệ số giá
            const truePriceMultiply = diffDays > 15 ? 1 : 1 + ((15 - diffDays) / 15);
            // Cập nhật giá vé dựa trên hệ số giá
            const price = await Price.findOne({
                where: {
                    plane_id : flight.plane_id,
                }
            })
            const updatedEconomyPrice = price.base_price_economy * truePriceMultiply;
            const updatedBusinessPrice = price.base_price_business * truePriceMultiply;

            // Cập nhật lại bảng flight
            await Flight.update(
                {
                    true_price_economy: updatedEconomyPrice ,
                    true_price_business: updatedBusinessPrice ,
                },
                { where: { flight_id } }
            );
        }

        return "Prices updated successfully for all flights.";
    } catch (error) {
        console.error("Error updating flight prices:", error);
        throw new Error ("Internal Server Error");
    }
};

module.exports = {
    updatePrice
}