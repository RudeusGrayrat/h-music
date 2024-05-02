const { APY_KEY_STRIPE, FRONTURL} = process.env;
const stripe = require('stripe')(APY_KEY_STRIPE)
const Pay = async (req, res) => {
    try {
          const { email } = req.body;

        const session = await stripe.checkout.sessions.create({
            success_url: `${FRONTURL}/pay`,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "subscripccion",
                            images: ["https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2021/12/02/spotify.png"]
                        },
                        unit_amount: 2000
                    },
                    quantity: 1
                },
            ],
            metadata: {
                user: email //aca se mete el usuario que llega por body
            },
            mode: 'payment',
        });
        return res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al pagar' });

    }
};

module.exports = Pay;