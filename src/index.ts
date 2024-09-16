import { CashuMint } from './CashuMint';
import { CashuWallet } from './CashuWallet';
import { setGlobalRequestOptions } from './request';
import { generateNewMnemonic } from '@cashu/crypto/modules/client/NUT09';
import { getEncodedToken, getDecodedToken, deriveKeysetId } from './utils';

// performance related patch START
import QuickCrypto from 'react-native-quick-crypto';

const deriveSeedFromMnemonic = (mnemonic: string): Uint8Array => {
	console.log('[deriveSeedFromMnemonic] patched')	
	const seed = QuickCrypto.pbkdf2Sync(normalize(mnemonic).nfkd, salt(''), 2048, 64, 'sha512')
	return seed;
};

const salt = (passphrase: string) => nfkd(`mnemonic${passphrase}`);

// Normalization replaces equivalent sequences of characters
// so that any two texts that are equivalent will be reduced
// to the same sequence of code points, called the normal form of the original text.
// https://tonsky.me/blog/unicode/#why-is-a----
function nfkd(str: string) {
  if (typeof str !== 'string') throw new TypeError(`Invalid mnemonic type: ${typeof str}`);
  return str.normalize('NFKD');
}

function normalize(str: string) {
  const norm = nfkd(str);
  const words = norm.split(' ');
  if (![12, 15, 18, 21, 24].includes(words.length)) throw new Error('Invalid mnemonic');
  return { nfkd: norm, words };
}
// performance related patch END

export * from './model/types/index';

export {
	CashuMint,
	CashuWallet,
	getDecodedToken,
	getEncodedToken,
	deriveKeysetId,
	generateNewMnemonic,
	deriveSeedFromMnemonic,
	setGlobalRequestOptions
};
