<?php

namespace App\Console\Commands;

use Illuminate\Foundation\Console\ServeCommand as ServeCommandBase;

class ServeCommand extends ServeCommandBase
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'serve';

    /**
     * The environment variables that should be passed from host machine to the PHP server process.
     *
     * @var string[]
     */
    public static $passthroughVariables = [
        'APP_ENV',
        'DB_CONNECTION',
        'DB_DATABASE',
        'DB_HOST',
        'DB_USERNAME',
        'DB_PASSWORD',
        'HERD_PHP_81_INI_SCAN_DIR',
        'HERD_PHP_82_INI_SCAN_DIR',
        'HERD_PHP_83_INI_SCAN_DIR',
        'IGNITION_LOCAL_SITES_PATH',
        'LARAVEL_SAIL',
        'PATH',
        'PHP_CLI_SERVER_WORKERS',
        'PHP_IDE_CONFIG',
        'SYSTEMROOT',
        'TMDB_API_KEY',
        'TMDB_API_URL',
        'TMDB_MEDIA_API_URL',
        'XDEBUG_CONFIG',
        'XDEBUG_MODE',
        'XDEBUG_SESSION',
    ];
}