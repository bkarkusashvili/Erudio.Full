<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Category
 *
 * @property int $id
 * @property string $title_ka
 * @property string|null $title_en
 * @property string $text_ka
 * @property string|null $text_en
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Course[] $courses
 * @property-read int|null $courses_count
 * @method static \Database\Factories\CategoryFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereTextKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereTitleKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\City
 *
 * @property int $id
 * @property string $name_ka
 * @property string|null $name_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Course[] $courses
 * @property-read int|null $courses_count
 * @method static \Illuminate\Database\Eloquent\Builder|City newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|City newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|City query()
 * @method static \Illuminate\Database\Eloquent\Builder|City whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereNameKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereUpdatedAt($value)
 */
	class City extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Client
 *
 * @property int $id
 * @property string|null $image
 * @property string $name_ka
 * @property string|null $name_en
 * @property string $text_ka
 * @property string|null $text_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Client newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client query()
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereNameKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereTextKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereUpdatedAt($value)
 */
	class Client extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Course
 *
 * @property int $id
 * @property string $name_ka
 * @property string|null $name_en
 * @property string|null $address_ka
 * @property string|null $address_en
 * @property int $price
 * @property string $methodology_ka
 * @property string|null $methodology_en
 * @property string $for_ka
 * @property string|null $for_en
 * @property string|null $phone
 * @property string|null $video
 * @property string|null $file
 * @property string|null $image
 * @property int $popular_training
 * @property int $popular_course
 * @property string|null $text_ka
 * @property string|null $text_en
 * @property int $days
 * @property int $type
 * @property int $popular_masterclass
 * @property string|null $goal_ka
 * @property string|null $goal_en
 * @property int $category_id
 * @property int $city_id
 * @property int $instructor_id
 * @property int $live_course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\City $city
 * @property-read mixed $is_live
 * @property-read \App\Models\Instructor $instructor
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LiveCourse[] $lives
 * @property-read int|null $lives_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CourseTopic[] $topics
 * @property-read int|null $topics_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CourseVideo[] $videos
 * @property-read int|null $videos_count
 * @method static \Database\Factories\CourseFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Course newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Course newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Course query()
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereAddressEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereAddressKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereForEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereForKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereGoalEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereGoalKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereInstructorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereLiveCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereMethodologyEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereMethodologyKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereNameKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course wherePopularCourse($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course wherePopularMasterclass($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course wherePopularTraining($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereTextKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereVideo($value)
 */
	class Course extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CourseTopic
 *
 * @property int $id
 * @property string $text_ka
 * @property string|null $text_en
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic query()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic whereTextKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseTopic whereUpdatedAt($value)
 */
	class CourseTopic extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CourseVideo
 *
 * @property int $id
 * @property string $name_ka
 * @property string|null $name_en
 * @property int $number
 * @property string $image
 * @property string $video
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $courses
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo query()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereNameKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseVideo whereVideo($value)
 */
	class CourseVideo extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Instructor
 *
 * @property int $id
 * @property string $name_ka
 * @property string|null $name_en
 * @property string $area_ka
 * @property string|null $area_en
 * @property string $profession_ka
 * @property string|null $profession_en
 * @property string $bio_ka
 * @property string|null $bio_en
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Course[] $courses
 * @property-read int|null $courses_count
 * @method static \Database\Factories\InstructorFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereAreaEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereAreaKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereBioEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereBioKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereNameKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereProfessionEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereProfessionKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instructor whereUpdatedAt($value)
 */
	class Instructor extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LiveCourse
 *
 * @property int $id
 * @property string $start
 * @property string $end
 * @property string $url
 * @property int|null $quantity
 * @property int $course_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $courses
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse query()
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LiveCourse whereUrl($value)
 */
	class LiveCourse extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Media
 *
 * @property int $id
 * @property string|null $image
 * @property string $title_ka
 * @property string|null $title_en
 * @property string $text_ka
 * @property string|null $text_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\MediaFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Media newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Media newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Media query()
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereTextKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereTitleKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Media whereUpdatedAt($value)
 */
	class Media extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Option
 *
 * @property int $id
 * @property string $key
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\OptionFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Option newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Option newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Option query()
 * @method static \Illuminate\Database\Eloquent\Builder|Option whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Option whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Option whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Option whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Option whereValue($value)
 */
	class Option extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Order
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $orderable
 * @method static \Database\Factories\OrderFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUpdatedAt($value)
 */
	class Order extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Page
 *
 * @property int $id
 * @property string $title_ka
 * @property string|null $title_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\PageFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page query()
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereTitleKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereUpdatedAt($value)
 */
	class Page extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PageMeta
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|PageMeta newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PageMeta newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PageMeta query()
 * @method static \Illuminate\Database\Eloquent\Builder|PageMeta whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PageMeta whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PageMeta whereUpdatedAt($value)
 */
	class PageMeta extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Slider
 *
 * @property int $id
 * @property string $title_ka
 * @property string|null $title_en
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\SliderFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Slider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Slider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Slider query()
 * @method static \Illuminate\Database\Eloquent\Builder|Slider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slider whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slider whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slider whereTitleKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Slider whereUpdatedAt($value)
 */
	class Slider extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Subscribe
 *
 * @property int $id
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\SubscribeFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe query()
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscribe whereUpdatedAt($value)
 */
	class Subscribe extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Team
 *
 * @property int $id
 * @property string|null $image
 * @property string $name_ka
 * @property string|null $name_en
 * @property string $profession_ka
 * @property string|null $profession_en
 * @property string $bio_ka
 * @property string|null $bio_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\TeamFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Team newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team query()
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereBioEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereBioKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereNameEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereNameKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereProfessionEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereProfessionKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUpdatedAt($value)
 */
	class Team extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Translate
 *
 * @property int $id
 * @property string $key
 * @property string $ka
 * @property string $en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Translate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Translate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Translate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Translate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Translate whereEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Translate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Translate whereKa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Translate whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Translate whereUpdatedAt($value)
 */
	class Translate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $firstname
 * @property string $lastname
 * @property string $personalnumber
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property int $isAdmin
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read int|null $orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePersonalnumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

