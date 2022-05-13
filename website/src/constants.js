/* eslint-disable */
import { PublicKey } from '@solana/web3.js'

let BASE_URL_DEFAULT
// local dev
if (window.location.href.indexOf('localhost') > 0) {
  BASE_URL_DEFAULT = 'http://localhost:8080/'
}
// staging
else if (window.location.href.indexOf('zionlabs.dev') > 0) {
  BASE_URL_DEFAULT = 'https://zion-staging.herokuapp.com/'
}
// prod
else {
  BASE_URL_DEFAULT = 'https://zion-backend.herokuapp.com/'
}
export const BASE_URL = BASE_URL_DEFAULT

const disabledLink = [
  'phantomweb.app',
  'aurory.app',
  'solvision.io',
  'staratlas.art',
  'starsatlas.com',
  'sollet.cc',
  'raydlum.io',
  'aurorynft.com',
  'solletweb.io',
  'i-sollet.com',
  'fancyfrenchienft.art',
  'solanawebwallet.online',
  'phahtom.com',
  'server-syncwallet.com',
  'staratias.app',
  'raydium.network',
  'grapesnetwork.me',
  'staratias.art',
  'soistarter.org',
  'audius-nft.top',
  'aurory.me',
  'degenapes.app',
  'phantom-app.online',
  'phantomwallet.net',
  'dapps-node.com',
  'phantom-app.link',
  'solanaoutage.com',
  'walletconnectdapps.net',
  'staratlas.cx',
  'web-phantom.app',
  '0120tt.com',
  'pnanton.app',
  'phantuomn.app',
  'phantom-web.app',
  'sonalt.com',
  'phantomwallets.net',
  'officialsolananft.com',
  'extension-phantom.app',
  'phantomwebapp.io',
  'raydium.space',
  'degentrashpandas.cc',
  'dappintegrate.app',
  'solnftpresale.com',
  'solananftlaunch.com',
  'solamiun.io',
  'phantom-beta.app',
  'solananftsale.com',
  'raydiums.net',
  'phantomwebapp.com',
  'webdapp-phantom.app',
  'pnantom.com',
  'phantom-walletweb.app',
  'phantomlite.app',
  'solanium.im',
  'solanium-blockasset.com',
  'moolah-monkeys.vercel.app',
  'sollet.ch',
  'phantom-recover.app',
  'walletsvalidators.net',
  'walletconnectee.com',
  'fractalproctol.online',
  'webphantom.app',
  'solanasmonkey.business',
  'phantom-betaweb.app',
  'xmasnftevent.com',
  'xmasnftdrop.com',
  'solanaxmasevent.com',
  'solxmasevent.com',
  'solnftfork.com',
  'solananftgift.com',
  'freexmasnft.com',
  'xmasairdrop.com',
  'getsolananft.com',
  'solanaxmas.com',
  'solanaxmasgift.com',
  'metasolnft.com',
  'solanagift.com',
  'claimxmasnft.com',
  'anatolyevent.com',
  'solnftbase.com',
  'sol-event.org',
  'solnftminting.com',
  'solanium.ist',
  'unwrapnftgift.com',
  'solnftdrop.com',
  'nftmintarea.com',
  'solanium.at',
  'officialsolanamint.com',
  'mintconnectpad.online',
  'officialsolanadrop.com',
  'solnftpresent.com',
  'officialsolanatoken.com',
  'multichainwalletconnect.com',
  'phantomwebs.app',
  'mintsolananft.com',
  'officialsoldrop.com',
  'claimsolnft.com',
  'kongracers.live',
  'solnftgiveaway.com',
  'starlaunchstake.app',
  'magiceden.site',
  'solanium.website',
  'easywalletfix.net',
  'officialsolanarares.com',
  'metapiex.com',
  'officialsolanamints.com',
  'officialsolgift.com',
  'magieden.com',
  'officialsolmint.com',
  'mintthegift.com',
  'officialgiftsolana.com',
  'officialmintnft.com',
  'solanium.ltd',
  'officialnftsolana.com',
  'maglcedem.io',
  'officialnftsol.com',
  'solnftgift.com',
  'solananftmint.com',
  'solananftevent.com',
  'solanartnft.io',
  'officialnftgift.com',
  'solanagift.net',
  'solanarl.io',
  'officialsolanamint.net',
  'officialsoldrop.net',
  'magiciden.com',
  'Solonarte.com',
  'nft-magiceden.su',
  'mint-magiceden.io',
  'officialsolmint.net',
  'officialmintnft.net',
  'phantom-airdrop.app',
  'walletbridgedapps.com',
  'app.solonarte.com',
  'colohdrt.com',
  'phantomdrop.live',
  'solananftgift.net',
  'magiciden.io',
  'magic-eden.org',
  'solananftevent.net',
  '-magiceden.io',
  'solsea.cc',
  'walletbridgeapps.org',
  'magiceden.ac',
  'magic-edens.org',
  'magisodan.top',
  'solananftgift.net',
  'officialsolanagift.net',
  'solsea.la',
  'mint-magiceden.com',
  'solsea.ia',
  'magiceden.la',
  'officialsolananft.net',
  'solsea.in',
  'officialsolgift.net'
]

export const MAGIC_EDEN_V2_PROGRAM_ID = new PublicKey(
  'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K'
)
export const MAGIC_EDEN_V2_AUTMW = new PublicKey(
  'autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2'
)
export const MAGIC_EDEN_V2_AUCTION_HOUSE_KEY = new PublicKey(
  'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe'
)
export const MAGIC_EDEN_V2_RFQFJ = new PublicKey(
  'rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt'
)
export const MAGIC_EDEN_V2_PROG_SIGNER = new PublicKey(
  '1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix'
)
export const MAGIC_EDEN_V2_PROG_SIGNER_BUMP = 250 // PublicKey.find_program_address([b'm2',b'signer'],program_id=PublicKey('M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K'))
export const MAGIC_EDEN_V2_SEED = 'm2'
export const MAGIC_EDEN_V2_DEPOSIT_DATA_PREFIX_BA = [
  242, 35, 198, 137, 82, 225, 242, 182
]
export const MAGIC_EDEN_V2_BUY_ORDER_DATA_PREFIX_BA = [
  102, 6, 61, 18, 1, 218, 235, 234
]
export const MAGIC_EDEN_V2_EXEC_SALE_DATA_PREFIX_BA = [
  37, 74, 217, 157, 79, 49, 35, 6
]
export const MAGIC_EDEN_V2_CANCEL_LIST_DATA_PREFIX_BA = [
  198, 198, 130, 203, 163, 95, 175, 75
]

export { disabledLink }
