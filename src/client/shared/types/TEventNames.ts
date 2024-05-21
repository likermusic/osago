export type TEventNames =
  | 'osago_landing'
  | 'osago_benefitcode_enter'
  | 'osago_benefitcode_success'
  | 'osago_benefitcode_not_found'
  | 'osago_benefitcode_already_activated'
  | 'osago_benefitcode_ended'
  | 'osago_contact_typ'

  // смс-уведомления
  | 'osago_wants_return_sms'

  // анкета
  | 'osago_contact_step1'
  | 'osago_contact_step1_data'
  | 'osago_contact_step1_get_car_info'
  | 'osago_contact_step2'
  | 'osago_contact_step3'
  | 'osago_contact_step_owner'
  | 'osago_contact_step4_phone'
  | 'osago_contact_step4'
  | 'osago_contact_step_authorize'
  | 'osago_contact_step_edit_drivers'

  // расчет
  | 'osago_contact_step4_data'
  | 'osago_calculation_complete'
  | 'osago_calculation_start'
  | 'osago_calculation_first1_ic'
  | 'osago_calculation_first3_ic'
  | 'osago_empty_result_on_calculations'

  // заказ
  | 'osago_choose_IC'
  | 'osago_contact_order'
  | 'osago_contact_step5'
  | 'osago_order_main_sk_refuse'
  | 'osago_order_main_sk_approve'
  | 'osago_order_main_sk_data_changed'
  | 'osago_order_main_sk_price_changed'
  | 'osago_order_first1_ic'
  | 'osago_order_first3_ic'
  | 'osago_contact_new_choose'
  | 'osago_empty_result_on_orders'
  | 'osago_contact_refuse'
  | 'osago_order_complete'
  | 'osago_order_start'
  | 'osago_order_user_has_awaited_payment_link'
  | 'osago_contact_step6';
