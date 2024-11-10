using UnityEngine;
// Attached to Arrow
public class ArrowController : MonoBehaviour
{
    public Transform target; // Assign your target in the inspector

    void Update()
    {
        // Make the arrow look at the target
        Vector3 direction = target.position - transform.position;
        Quaternion lookRotation = Quaternion.LookRotation(direction);

        // Rotate the arrow to look towards the target using the X-axis as forward
        transform.rotation = lookRotation * Quaternion.Euler(0, 90, 0); // Adjust this if the rotation is different
    }
}