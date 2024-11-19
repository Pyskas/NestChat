<?php

namespace App\Jobs;

use App\Events\GroupDeleted;
use App\Models\Group;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteGroupJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels; // Убрана повторная строка use Queueable

    /**
     * Create a new job instance.
     */
    public function __construct(public Group $group)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $id = $this->group->id;
        $name = $this->group->name;

        $this->group->last_message_id = null;
        $this->group->save();

        // Удаляем все сообщения в группе
        $this->group->messages->each->delete();

        // Открепляем всех пользователей от группы
        $this->group->users()->detach();

        // Удаляем саму группу
        $this->group->delete();

        // Отправляем событие о том, что группа была удалена
        GroupDeleted::dispatch($id, $name);
    }
}
