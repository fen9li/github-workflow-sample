#!/bin/sh

set -e

# mkdir ~/.ssh
# touch ~/.ssh/known_hosts
#
# echo "|1|onf2d1BR9wQLRm+TmiXJYu2wl1A=|E6wUyZ4fjO2zOB6ZK/3ommEtfZM= ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
# |1|9EzfIsIkdbqX9mMMUKidE6m3i3Y=|PDGjrQ+wOJlpq2R1iJ39L41JVps= ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==" > ~/.ssh/known_hosts

npm install --global lerna

export VUE_APP_UPLOADCARE_PUBLIC_KEY=d97b44cea4283aa8b7a3

### build and release "online-offers-test"

export publish="./packages/online-offers/dist"
export VUE_APP_API_URL="https://api.dev.oo.eonx.com"
export VUE_APP_AUTH0_AUDIENCE="https://api.dev.online-offers.com.au"

yarn clean && lerna exec --scope @loyaltycorp/manage-online-offers -- yarn build

### build and release "payments-test"

export publish="./packages/payments/dist"
export VUE_APP_API_URL="https://api.dev.payments.eonx.com/"
export VUE_APP_AUTH0_AUDIENCE="https://api.dev.payments.eonx.com/"
export VUE_APP_ELASTIC_HOST="https://api.dev.payments.eonx.com/search"

yarn clean && lerna exec --scope @loyaltycorp/manage-payments -- yarn build

### build and release "manage-super-test"

export publish="./packages/super/dist"
export VUE_APP_BASE_URL="/"
export VUE_APP_API_URL="https://api.dev.manage.eonx.com/"
export VUE_APP_AUTH0_AUDIENCE="https://test-api.com"
export VUE_APP_AUTH0_CLIENT_ID="TvJExlVBQLRPIrztvFgYZIaw7PAa0q0a"
export VUE_APP_AUTH0_DOMAIN="eonx-dev.au.auth0.com"
export VUE_APP_AUTH0_SCOPES="read:events update:events product:read product:create product:delete product:update product_version:create product_version:delete product_version:read product_version:update provider:create provider:delete provider:read provider:update roles_matrix:update user:create user:delete user:read user:update"

yarn clean && lerna exec --scope @loyaltycorp/manage-super -- yarn build
