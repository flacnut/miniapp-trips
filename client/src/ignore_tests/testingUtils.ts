/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

export function isTestRun() {
    return process.env.JEST_WORKER_ID !== undefined;
}
