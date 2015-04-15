"use strict";

function NotFoundError(code, error){
  Error.call(this, typeof error === 'undefined' ? undefined: error.message);

}