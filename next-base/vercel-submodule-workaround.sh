# github submodule repo address without https:// prefix
SUBMODULE_GITHUB=gitlab.com/pionero/ecm/common-ui.git

# .gitmodules submodule path
SUBMODULE_PATH=common-ui

# github access token is necessary
# add it to Environment Variables on Vercel
if [ "$GITHUB_ACCESS_TOKEN" == "" ]; then
  echo "Error: GITHUB_ACCESS_TOKEN is empty"
  exit 1
fi

# stop execution on error - don't let it build if something goes wrong
set -e

git config --global url.https://oauth2:$GITHUB_ACCESS_TOKEN@gitlab.com/.insteadOf git@gitlab.com:
git submodule update --init --recursive
