const { Pago } = require("../../models");

// Guardar o actualizar un pago en la base de datos
async function saveOrUpdatePayment(paymentData) {
  console.log("PAYMENT DATA: ", paymentData);

  const {
    id: payment_id,
    transaction_amount,
    status_detail,
    status,
    money_release_date,
    money_release_status,
    currency_id,
    additional_info,
    payer,
    fee_details,
    transaction_details,
    external_reference,
  } = paymentData;

  // Extraemos el user_id desde external_reference
  let user_id = null;
  try {
    const parsedReference = JSON.parse(external_reference);
    user_id = parsedReference.user_id || null; // Extraemos el user_id desde el JSON
  } catch (error) {
    console.error("❌ Error al parsear external_reference:", error);
  }

  const product_id = additional_info?.items?.[0]?.id || null;

  const total_paid_amount = transaction_details?.total_paid_amount || null;
  const net_received_amount = transaction_details?.net_received_amount || null;
  const fee_amount = fee_details?.[0]?.amount || 0;

  try {
    const [payment, created] = await Pago.findOrCreate({
      where: { payment_id },
      defaults: {
        user_id,
        product_id,
        transaction_amount,
        total_paid_amount,
        fee_amount,
        net_received_amount,
        status_detail,
        status,
        money_release_date,
        money_release_status,
        currency_id,
      },
    });

    if (!created) {
      await payment.update({
        user_id,
        product_id,
        transaction_amount,
        total_paid_amount,
        fee_amount,
        net_received_amount,
        status_detail,
        status,
        money_release_date,
        money_release_status,
        currency_id,
      });
      console.log("✅ Pago actualizado correctamente en la DB.");
    } else {
      console.log("✅ Pago creado correctamente en la DB.");
    }
  } catch (error) {
    console.error("❌ Error al guardar el pago:", error.message);
    throw new Error(`Error al guardar el pago: ${error.message}`);
  }
}

module.exports = { saveOrUpdatePayment };
