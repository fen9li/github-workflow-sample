import get from 'lodash/get'

export default offer => {
  const map = get(offer, 'map') || {}
  const merchant = get(offer, 'feed_merchant.merchant') || {}
  return offer.feed
    && offer.acknowledgement !== 'deleted'
    && offer.created_at
    && offer.updated_at
    && merchant.name
    && map.name
    && map.code
    && map.start_date
    && map.end_date
    && map.description
    && map.terms
    && map.tracking_url
}
